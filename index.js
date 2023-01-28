import fs from 'fs';
import path from 'path';

Bun.serve({
    port: process.env.PORT || 3000,
    async fetch(req) {
        let res = {};

        res.files = await fetchFiles();
        res.blobs = await fetchBlobs();
        res.storage = getStorage();

        return new Response(JSON.stringify(res));
    }
})

async function api(method, params={}) {
    let res = await fetch('localhost:5279', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            method: method,
            params: params
        })
    });
    return await res.json();
}

async function fetchBlobs() {
    const res = await api('blob_list');

    return res.result.total_items;
}

async function fetchFiles() {
    const res = await api('file_list');

    return res.result.total_items;
}

function getStorage() {
    const files = fs.readdirSync(process.env.LBRYNET_PATH + 'blobfiles/');
    let size = 0;
    files.forEach( (file) => {
        size += fs.statSync(process.env.LBRYNET_PATH + 'blobfiles/' + file).size;
    } );

    // Default to KB
    size = size / 1024;
    let prefix = 'KB';

    // Convert to MB
    if (size > 1024) {
        size = size / 1024;
        prefix = 'MB';
    }

    // Convert to GB
    if (size > 1024) {
        size = size / 1024;
        prefix = 'GB';
    }

    // Round to only have one decimal
    size = Math.ceil(size*10)/10;

    return {
        size: size,
        unit: prefix
    }
  }