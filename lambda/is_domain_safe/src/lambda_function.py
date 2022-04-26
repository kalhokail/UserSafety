import json
import boto3
from urllib.parse import urlparse

#A function to check if a domain is safe or not. Takes a domain and returns a link for result

dynamodb = boto3.client('dynamodb')

def strip_domain(url):
    d = urlparse(url).netloc
    return {"protocol": urlparse(url).scheme, "main_host": '.'.join(d.split('.')[-2:]), "host": d, "tld": d.split('.')[-1]}

def lambda_handler(event, context):
    print(event)
    body = event['body-json']
    
    domain = strip_domain(body['url'])
    
    print("Protocol: " + domain['protocol'])
    print("Main Domain: " + domain['main_host'])
    print("Domain: " + domain['host'])
    print("tld: " + domain['tld'])

    url = domain['protocol'] + "://" + domain['host']
    
	return {
        'domain': 'apple.com',
        'status': 'notsafe',
        'short_description': {
            'ar': 'الموقع آمن',
            'en': 'Site is safe.'
        },
        'description':{
            'ar': 'هذا الموقع آمن وبإمكانك استخدامة',
            'en': '<h2>This website</h2> is safe and you can use it.'
        }
    }
