import re

# Run "python3 update.py"

new_version = "1.4.1"
new_versionCode = 141

Website_version = "./Website/package.json"
Android_version = "./Android/app/build.gradle"


def version_change(target, version):
    print(f"Change target {target} version to {version}")


version_change("Website", f"{new_version} ({new_versionCode})")
with open(Website_version, 'r+') as f:
    text = f.read()
    text = re.sub(r"\"version\": \"(.*?)\",",
                  f"\"version\": \"{new_version}\",", text)
    text = re.sub(r"\"versionCode\": \"(.*?)\",",
                  f"\"versionCode\": \"{new_versionCode}\",", text)
    f.seek(0)
    f.write(text)
    f.truncate()


version_change("Android", f"{new_version} ({new_versionCode})")
with open(Android_version, 'r+') as f:
    text = f.read()
    text = re.sub(r"versionName \"(.*?)\"",
                  f"versionName \"{new_version}\"", text)
    text = re.sub(r"versionCode \"(.*?)\"",
                  f"versionCode \"{new_versionCode}\"", text)
    f.seek(0)
    f.write(text)
    f.truncate()
