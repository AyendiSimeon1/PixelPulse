import mongoose from "mongoose";

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const compression = require('compression');


class Server {
    private app: any;
    
    constructor() {
        this.app = express();
        this.initialieMiddlewares();
        this.connectDatabase();
        this.setupRoutes();
        
    }

    private initialieMiddlewares() {
        this.app.use(cors({
            origin: process.env.ALLOWED_ORGINS?.split(',') || '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));

        this.app.use(helmet());

        const limiter = rateLimit({
            windowMs: 15 * 60 *1000,
            max: 100,
            message: 'Too many requests, please try again later',
            standardHeaders: true,
            legacyHeaders: false 
        });

        this.app.use(limiter);

        this.app.use(express.json({ limit: '10mb' }));
    
    }

    private async connectDatabase() {
        try {
            await mongoose.connect(process.env.MONGO_URI {
                retryWrites: true,
                w: 'majority'
            });
            console.log('MongoDB connected succesfully');
        } catch (error) {
            console.log('MongoDB connection error', error);
            process.exit(1);
        }
    }

    private setupRoutes () {
        this.app.get('/', (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
            res.status(200).json({ message: 'Video content backend'})
        });
        this.app.use(routes);
    }
    public start(port: number) {
        const server = this.app.listen(port, () =>{
            console.log(`Server is running on port ${port}`);
        });

        return server;
    }

    public getApp() {
        return this.app;
    }
    
}

export default Server;
