import * as Prismic from '@prismicio/client'


export function createClient() {
    const endpoint = process.env.PRISMIC_EDPOINT
    const client = Prismic.createClient(endpoint, {
      accessToken: process.env.PRISMIC_ACESS_TOKEN,
      

    })
  
    

  
    return client
  }
