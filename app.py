'''
Note: This doesn't use cookies yet, it might be better to make the bot remember the history and have
a aiohttp session of their own.

This program uses openai service for chat completion
'''

from fastapi import FastAPI, Request, Body
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import aiohttp

token = 'Insert Openai token here'
app = FastAPI()

app.mount('/static', StaticFiles(directory='static'), name='static')

templates = Jinja2Templates(directory='templates')

@app.get('/', response_class=HTMLResponse)
async def main(request: Request):
    return templates.TemplateResponse('index.html', {'request': request})

@app.post('/get-response')
async def getResponse(data: dict = Body(...)):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }
    async with aiohttp.ClientSession(headers=headers) as session:
        data = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": "You are a helpful friendly chatbot"},
                {"role": "user", "content": data['user_text']}
            ]
        }
        response = await session.post('https://api.openai.com/v1/chat/completions', json=data)
        response = await response.json()
    return {
        'response': response['choices'][0]['message']['content']
    }