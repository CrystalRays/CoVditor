from fastapi import FastAPI,Cookie,Response,UploadFile,Body
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse,StreamingResponse
from fastapi.exceptions import HTTPException
import jwt 
import uvicorn
from threading import Lock
import time
from hashlib import md5
import random
from utils import *
import config
app=FastAPI()

docLock=Lock()
nowDoc=""
docHistory=[]
editStatus={}
key=random.randbytes(16)

app.mount("/dist", StaticFiles(directory="statics/dist"), name="dist")
app.mount("/uploads", StaticFiles(directory="statics/uploads"), name="uploads")
# app.mount("/image", StaticFiles(directory="statics/image"), name="image")
# app.mount("/js", StaticFiles(directory="statics/js"), name="js")

@app.get("/")
async def home():
    return HTMLResponse(content=open(f"statics/index.html","r",encoding="utf-8").read(), status_code=200)

@app.post("/user/login")
async def userLogin(response:Response,username:str=Body(...),password:str=Body(...)):
    if not config.chkpwd or checkPassword(username,password):
        response.set_cookie("token",jwt.encode({"username": username,"password":md5(password.encode()).hexdigest()}, key, algorithm="HS256"),httponly=True)
        return {"success":True,"username":username}
    else:
        return {"success":False}
    
@app.get("/user/check")
async def userLogin(response:Response,token:str=Cookie(...)):
    try:
        user=jwt.decode(token,key,"HS256")
        return {"success":True,"username":user["username"]}
    except:
        response.set_cookie("token","",expires="1970-01-31T12:34:59.866Z",httponly=True)
        return {"success":False}

@app.get("/user/logout")
async def userLogin(response:Response):
    response.set_cookie("token","",expires="1970-01-31T12:34:59.866Z",httponly=True)

@app.post("/api/sync")
async def sync(lastGlobalId:int=Body(...),lastLocalId:int=Body(...),nowLocalId:int=Body(...),opStack:list=Body(...),token:str=Cookie(...)):
    global nowDoc,docHistory,docLock
    docLock.acquire()
    docHistory[lastGlobalId]
    for each in opStack:
        lastLocalId+=1

        
    
    updates=[]
    docLock.release()
    return {"updates":updates,"historyId":1}

@app.post("/api/upload")
async def upload(file:list):
    filenames={}
    for one in file:
        filename=time.time()+md5(one.filename).hexdigest()+one.filename[one.filename.find("."):]
        open(filename,"w").write(one.file.read())
        filenames[one.filename]="/uploads/"+filename
    return {
            "msg": "",
            "code": 0,
            "data": {
            "errFiles": [],
            "succMap": filenames
            }
        }
if __name__ == '__main__':
    uvicorn.run(app,host="0.0.0.0",port=8000)