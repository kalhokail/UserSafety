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
    
    if domain['main_host'] == "apple.com":
        print("https://cdn.al-hokail.com/safety/safe.html?url=" + url)
        return {"status": "https://cdn.al-hokail.com/safety/safe.html?url=" + url}
    elif domain['main_host'] == "google.com":
        return {"status": "https://cdn.al-hokail.com/safety/notsafe.html?url=" + url}
    else:
        return {"status": "https://cdn.al-hokail.com/safety/unknown.html?url=" + url}
