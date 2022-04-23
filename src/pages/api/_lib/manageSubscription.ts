import { fauna } from "../../../service/fauna";
import {query as q} from 'faunadb'
import { stripe } from "../../../service/stripe";

export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
    createdAction = false,
    
){
    const userRef = await fauna.query(
        q.Select(
            'ref',
            q.Get(
                q.Match(
                    q.Index('user_stripe_customer_id'),
                    customerId
                )
            )
        )
    )

    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    const subscriptionData = {
        id : subscription.id,
        userId: userRef,
        status: subscription.status,
        prive_id: subscription.items.data[0].price.id
    }

    if(createdAction){
        await fauna.query(
            q.Create(
                q.Collection('subscriptions'),{
                    data: subscriptionData
                }
            )
        )
    }else{
       await fauna.query(
            q.Replace(
                q.Select(
                    'ref',
                    q.Get(
                        q.Match(
                            q.Index('subscriptions_by_id'),
                            subscriptionId,
                        )
                    )

                ),
                {data : subscriptionData}

            )
            
        )
    }
    


}