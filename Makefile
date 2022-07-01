NODE_BIN = ./node_modules/.bin

licenses:
	cd Website && node license > ./src/utils/licenses.json
	
dev: licenses
	cd Website && ${NODE_BIN}/webpack --mode=development

prod: licenses
	cd Website && ${NODE_BIN}/webpack --mode=production

npm:
	cd Website && npm install ${i}

app: generateDebugApp openDebugApp

openDebugApp:
	adb shell am start -n "com.dergoogler.mmrl.debug/com.dergoogler.mmrl.MainActivity" -a android.intent.action.MAIN -c android.intent.category.LAUNCHER

generateDebugApp: dev
	cd Android && ./gradlew installDebug

