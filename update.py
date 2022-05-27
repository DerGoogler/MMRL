import re

# Run "python3 update.py"

new_version = "1.4.0@alpha-4"
new_versionCode = 1400

Website_version = "./Website/package.json"
Android_version = "./Android/app/build.gradle"


def target_change(target, version):
    print(f"Change target {target} version to {version}")


target_change("Website", f"{new_version} ({new_versionCode})")
with open(Website_version, 'r+') as f:
    text = f.read()
    text = re.sub(r"\"version\": \"(.*?)\",",
                  f"\"version\": \"{new_version}\",", text)
    text = re.sub(r"\"versionCode\": \"(.*?)\",",
                  f"\"versionCode\": \"{new_versionCode}\",", text)
    f.seek(0)
    f.write(text)
    f.truncate()


target_change("Android", f"{new_version} ({new_versionCode})")
with open(Android_version, 'r+') as f:
    text = f.read()
    text = re.sub(r"versionName \"(.*?)\"",
                  f"versionName \"{new_version}\"", text)
    text = re.sub(r"versionCode \"(.*?)\"",
                  f"versionCode \"{new_versionCode}\"", text)
    f.seek(0)
    f.write(text)
    f.truncate()
