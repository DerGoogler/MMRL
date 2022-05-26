NODE_BIN = "./node_modules/.bin"

licenses:
	${NODE_BIN}/license-checker --json --production --customPath ./licenseBuild/customFormat.json > ./licenseBuild/licenses.json

dev: licenses
	${NODE_BIN}/webpack

prod: licenses
	${NODE_BIN}/webpack --mode production

install:
	npm install -f

debugAPK:
	./../Android/gradlew assembleDebug