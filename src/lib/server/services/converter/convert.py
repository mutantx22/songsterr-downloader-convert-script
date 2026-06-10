from pathlib import Path
import subprocess
import shutil

json_folder = "./downloads"
output_gp7 = "./downloads/song.gp7"

json_files = [
    f for f in Path(json_folder).glob("*.json")
    if f.name != "metadata.json"
]

node_path = shutil.which("node")

if not node_path:
    raise Exception("Node.js is not installed or not in PATH")

cmd = [
    node_path,
    "node_modules/tsx/dist/cli.mjs",
    "convert.ts",
    output_gp7,
    *[str(f) for f in json_files]
]

print("Running:", cmd)

subprocess.run(cmd, check=True, shell=True)