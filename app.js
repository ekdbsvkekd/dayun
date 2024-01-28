const express = require('express');
const dotenv = require('dotenv');
const { createClient } = require('redis');
const axios = require('axios'); 

dotenv.config();

const redisClient = createClient({ legacyMode: true });
redisClient.on('connect', () => {
    console.info('Redis connected!');
});
redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
});

module.exports = {
    cacheHitCount, cacheLikeCount, cacheScrapCount
};

async function cacheHitCount(postId) {
    try {
        const reply = await redisClient.set(postId, 'hits');
        console.log('Hit count set in Redis:', reply);
    } catch (err) {
        console.error('Error setting hit count in Redis:', err);
    }
}

async function cacheLikeCount(postId) {
    try {
        const reply = await redisClient.set(postId, 'likes');
        console.log('Like count set in Redis:', reply);
    } catch (err) {
        console.error('Error setting like count in Redis:', err);
    }
}

async function cacheScrapCount(postId) {
    try {
        const reply = await redisClient.set(postId, 'scraps');
        console.log('Scrap count set in Redis:', reply);
    } catch (err) {
        console.error('Error setting scrap count in Redis:', err);
    }
}

setInterval(() => {
    resetCount('hits');
    resetCount('likes');
    resetCount('scraps');

    
    const dataToUpdateServer = {}; 
    updateServer(dataToUpdateServer);

}, 60000);

async function resetCount(type) {
    try {
        const reply = await redisClient.set(type, 0);
        console.log(`${type} count reset in Redis`);
    } catch (err) {
        console.error('Error resetting count in Redis:', err);
    }
}


function updateServer(data) {

    axios.post('http://your-server-endpoint.com/update', data)
        .then(response => {
            console.log('Data updated on server:', response.data);
        })
        .catch(error => {
            console.error('Error updating data on server:', error);
        });
}
