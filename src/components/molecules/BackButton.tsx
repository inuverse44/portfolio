import React from 'react';
import Link from 'next/link';
import styles from './BackButton.module.css';

const BackButton = () => {
    return (
        <Link href="/blog" className={styles.backButton}>
            戻る
        </Link>
    );
};

export default BackButton;