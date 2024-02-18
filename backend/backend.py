from flask import Flask, request, jsonify, abort
from typing import *
from dataclasses import dataclass, asdict
from openai import OpenAI
from dotenv import load_dotenv
import os
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app) 
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@dataclass
class Block:
    type: str
    data: str
    
    
@app.route('/submit', methods=['POST', 'OPTIONS'])
def handle_blocks():
    try:
        content = request.json
        base_image: Block = Block(**content['base_image'])
        blocks: List[Block] = [Block(**blk) for blk in content['blocks']]
        
        # docker_image = f"create a docker file using a {base_image.data} base image with the following instructions: "
        commands = []        
        for b in blocks:
            res = ""
            if b.type == "base image":
                res = f"create a docker file using a {base_image.data} base image with the following instructions: "
            elif b.type == "install":
                res = f"install the following package: {b.data}"
            elif b.type == "env variables":
                res = f"set an environment variable for {b.data}"
            elif b.type == "run a command":
                res = f"create and run a command to {b.data}"
            else:
                abort(500, description="error with block type")
            commands.append(res)
        commands.append("execute each step in a separate command. include comments.")
        commands.append("do not include any other text, only the docker file in plaintext")

        # Assuming your processing here...

        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "SPOCs (Systems Programmer, Operator, and Consultants) \
                assist in the installation, maintenance, development, and documentation of local software. \
                You are a SPOC that is building a docker image for people given specific instructions."},
                {"role": "user", "content": "\n".join(commands)
                }
            ]
        )
        # return commands, 200
        return completion.choices[0].message.content, 200
        # return jsonify({
        #                 "input blocks": blocks,
        #                 "output": completion.choices[0].message.content
        #                 }), 200
    except Exception as e:
        # Log the error here
        print(f"Error: {e}")
        abort(500, description="Internal Server Error")
        


@app.route('/test', methods=['GET', 'POST', 'OPTIONS'])
def test_route():
    return jsonify({"message": "Test successful"}), 200


if __name__ == '__main__':
    app.run(port=8000, debug=True)