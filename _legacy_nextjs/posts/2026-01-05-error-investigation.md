---
title: GKE上にデプロイしているRabbitMQでエラーを調査する
date: '2026-01-05'
tags:
  - GCP
  - GKE
  - RabbitMQ
cover: https://www.ibm.com/content/adobe-cms/jp/ja/products/instana/supported-technologies/rabbitmq-monitoring/jcr:content/root/table_of_contents/body/content_section_styled/content-section-body/complex_narrative/logoimage.coreimg.png/1692219515370/rabbit.png
published: true
---

## GKE上にデプロイしているRabbitMQでエラーを調査する

今回遭遇したエラーは以下の3つです。

- `Non-AMQP exit reason '{shutdown,{writer,send_failed,timeout}}'`
- `Error on AMQP connection ... channel 1: {shutdown,{writer,send_failed,timeout}}`
- `closing AMQP connection ...: {inet_error,enotconn}`

![error](/images/posts/2026-01-05-error-investigation/error.png)


#### `Non-AMQP exit reason '{shutdown,{writer,send_failed,timeout}}'`について

RabbitMQ の接続内には「writer」プロセスがいて、サーバ→クライアント方向の送信を担当します。
そこで send が timeout した（= OS ソケット送信が進まない／ACKが返らない／送信バッファが詰まる等）ため、接続プロセスが shutdown します。
これが Non-AMQP exit reason として出ているのは、AMQP の通常クローズ（プロトコル上の close）ではなく、Erlang プロセスが内部理由で落ちたという意味です。


#### `Error on AMQP connection ... channel 1: {shutdown,{writer,send_failed,timeout}}`について

enotconn は「ソケットが接続状態にない」を意味します。典型的にはすでに相手がTCPを切ったあるいはネットワーク/ロードバランサ/Conntrack等が先に切ったその後に RabbitMQ が何か送ろうとして失敗したという順序で起きます。ログでも、エラー→クローズが近接して並んでいます。


#### `closing AMQP connection ...: {inet_error,enotconn}`について

これはサーバ視点で「クライアントが突然切った」です。ただし実務上は、クライアント自身が能動的に close した場合も、ネットワーク機器が途中で切った場合も、この形に見えるので、これ単体で「アプリが悪い」とは断定できません。



#### エラーを引き起こしている対象を探す

GKEのポッドであることは間違いないので、対象のポッドの内部IPアドレスを確認します。これは簡単で
```bash
kubectl get pod -A -o wide | grep <IPアドレス>
```
で可能です。



## 考え方メモ

Cloud Logging上でRabbitMQから発せられるログの多くにはポッドの内部IPアドレスが含まれています。ログ分析を使うことで、どのGKEのどのサービスがどれくらい頻繁にエラーを引き起こしているかを調査できそうだと思いました。

しかし、課題としてはポッドが死んだ場合に、新しいIPが振られている可能性があることですね。サービスに属する新しいIPまで追跡できるようになれば、エラーの調査がより容易になると思いました。