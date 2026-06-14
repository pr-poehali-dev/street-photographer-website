import json
import os
import urllib.request
import boto3


def handler(event: dict, context) -> dict:
    '''Импортирует фото из публичной папки Яндекс.Диска в S3 (CDN проекта)'''
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}, 'body': ''}

    public_key = 'https://disk.yandex.ru/d/_y-j0EFp9AhD_Q'
    api = f'https://cloud-api.yandex.net/v1/disk/public/resources?public_key={public_key}&limit=100'
    with urllib.request.urlopen(api) as r:
        data = json.loads(r.read().decode())

    items = data.get('_embedded', {}).get('items', [])

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )

    result = []
    for it in items:
        if it.get('type') != 'file':
            continue
        name = it['name']
        original = None
        for s in it.get('sizes', []):
            if s.get('name') == 'ORIGINAL':
                original = s['url']
                break
        if not original:
            original = it.get('file')
        if not original:
            continue

        req = urllib.request.Request(original, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            body = resp.read()

        key = f'ignat/{name}'
        s3.put_object(Bucket='files', Key=key, Body=body, ContentType='image/jpeg')
        cdn = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"
        result.append({'name': name, 'url': cdn})

    result.sort(key=lambda x: x['name'])
    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'isBase64Encoded': False,
        'body': json.dumps({'count': len(result), 'photos': result}, ensure_ascii=False),
    }
