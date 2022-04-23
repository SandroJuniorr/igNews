import Head from 'next/head';
import { GetStaticProps } from 'next/types';
import React from 'react';
import { createClient } from '../../service/prismic';
import { RichText} from 'prismic-dom'
import styles from './posts.module.scss'

type Post = {
            slug: string,
            title: string,
            excerpt: string,
            updateAt:string
}
interface PostsProps {
    posts:Post[]
}

function posts ({posts}:PostsProps) {
  return (
      <>
        <Head>
            <title>Post | ignews</title>
        </Head>

        <main className={styles.container}>
            <div className={styles.posts}>
                {posts.map(post => (
                    <a key={post.slug} href='#'>
                    <time>{post.updateAt}</time>
                    <strong>{post.title}</strong>
                    <p>{post.excerpt}</p>
                </a>
                ))}
                
            
            </div>
        </main>
      </>
  );
}

export default posts;

export const getStaticProps: GetStaticProps = async ()=>{
    const prismic = createClient()

    const response = await prismic.getAllByType('post', {
        fetch:['post.title', 'post.content'],
        pageSize: 100,
    })

    console.log(JSON.stringify(response,null,2))

    const posts = response.map(post =>{
       return {
            slug: post.uid,
            title: post.data.title,
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updateAt: new Date(post.last_publication_date).toLocaleDateString('pt-br', {
                day:'2-digit',
                month: 'long',
                year:'numeric'
            })
        }
    })
    

    return{
        props:{
            posts,
        }
    }
}