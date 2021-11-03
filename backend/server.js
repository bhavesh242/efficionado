import express from 'express'
import mongoose from 'mongoose'
import config from 'config';

const app = express();
const dbConfig = config.get('Efficionado.dbConfig.dbName')

mongoose.connect(dbConfig, {
}).then(()=>{
    console.log('Database Connected');
}).catch(err=>{
    console.log(err)
});