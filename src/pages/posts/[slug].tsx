import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { createClient } from "../../service/prismic"
import * as prismicH from '@prismicio/helpers'
import Head from "next/head"
import styles from "./post.module.scss"
interface PostProps {
    post : {
    slug: string,
    title: string,
    content: string,
    updateAt:string
}

}
export default function Post({post} : PostProps){
    return(
        <>
        <Head>
            <title>{post.title} | ignews</title>
        </Head>

        <main 
            className={styles.container}>
            <article 
                className={styles.post}>
                <h1>{post.title}</h1>
                <time>{post.updateAt}</time>

                <div 
                className={styles.postContent}
                dangerouslySetInnerHTML={{__html:post.content}}/>
            </article>
        </main>

        </>


    )
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
    const session = await getSession({req})
    const {slug} = params

    if(!session.activeSubscription){
        return{
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    

    const prismic = createClient()

    const response = await prismic.getByUID('post',String(slug),{})

    const post ={
        slug,
        title: response.data.title,
        content: prismicH.asHTML(response.data.content),
        updateAt: new Date(response.last_publication_date).toLocaleDateString('pt-br', {
                day:'2-digit',
                month: 'long',
                year:'numeric'
            })
    }


    return {
        props: {
            post,
        }
    }

}


