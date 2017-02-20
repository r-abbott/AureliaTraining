import {HttpClient, json} from 'aurelia-fetch-client';

export class RealWebAPI {
    static inject = [HttpClient];

    constructor(http){
        http.configure(config=>
        {
            config
            .useStandardConfiguration()           
            .withBaseUrl('http://localhost:58554/api/contacts')
            .withDefaults({
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json',
                }
            })
        })
        this.client = http;
        this.isRequesting = this.client.isRequesting;
    }

    isRequesting = false;
    
    getContactList(){
        return this.client
            .fetch('')
            .then(response=>response.json())
            .catch(error =>{
                alert('Error retrieving contact.')
            });
    }

    getContactDetails(id){
        return this.client
            .fetch('/' + id)
            .then(response=>response.json())
            .catch(error =>{
                alert('Error retrieving contact.')
            })
    }

    saveContact(contact){
        return this.client
            .fetch('/' + contact.id,
                {
                    method:'put',
                    body: json(contact)
                })
            .then(response=> response.json());
            

        
    }
}