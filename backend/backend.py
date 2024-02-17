from flask import Flask, request, jsonify
from typing import *
from dataclasses import dataclass, asdict
from openai import OpenAI
import os

app = Flask(__name__)

@dataclass
class Block:
    type: str
    data: str

@app.route('/submit', methods=['POST'])
def handle_blocks():
    content = request.json
    base_image: Block = Block(**content['base_image'])
    blocks: List[Block] = [Block(**blk) for blk in content['blocks']]
    
    # For demonstration, we'll return the received data as JSON
    response_data = {
        'base_image': asdict(base_image),
        'blocks': [asdict(block) for block in blocks]
    }
    
    
    
    return jsonify(response_data), 200

if __name__ == '__main__':
    app.run(debug=True)