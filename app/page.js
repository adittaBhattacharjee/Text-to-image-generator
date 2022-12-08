'use client'
import styles from "./Home.module.css"
import Image from "next/image"
import { BsGithub, BsTwitter, BsInstagram } from "react-icons/bs"
import { useState } from "react"

export default function () {
    const [prompt, setPrompt] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [loading, setLoading] = useState(0);


    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(1)
        const response = await fetch('/api/image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt
            })
        });
        const imageResponse = await response.json();
        console.log(imageResponse);
        setImageURL(imageResponse.imageURL);
        setLoading(0);
    }

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className={styles.container}>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Create <span className={styles.pink}> image through text </span> with <span className={styles.blue}> DALL·E </span>!
                </h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        className={styles.searchbar}
                        placeholder="Generate image with AI..."
                        onChange={(e) => setPrompt(e.target.value)}
                        id="prompt"
                        type="text"
                        name="prompt"
                    />

                    <button className={styles.button}>
                        <span className={styles.button_text}>Generate</span>
                    </button>
                </form>
                {imageURL !== '' ? (
                    <img className="result-image" src={imageURL} alt="result" />
                ) : (
                    <></>
                )}
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://aditya-bhattacharjee.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.bold}
                >
                    Created by @Aditya Bhattacharjee
                </a>
                <div className={styles.icons}>
                    <a
                        href="https://twitter.com/DoritosAdidas"
                        target="_blank"
                    >
                        <BsTwitter className={styles.twitter} />
                    </a>
                    <a
                        href="https://twitter.com/DoritosAdidas"
                        target="_blank"
                    >
                        <BsInstagram className={styles.instagram} />
                    </a>
                    <a
                        href="https://twitter.com/DoritosAdidas"
                        target="_blank"
                    >
                        <BsGithub className={styles.github} />
                    </a>
                </div>
            </footer>
        </div>
    )
}

function Loading() {
    return (
        <main className={styles.main}>
            <div className={styles.loading}><div></div><div></div><div></div><div></div></div>
        </main>)
}