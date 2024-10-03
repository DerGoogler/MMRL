import com.android.build.gradle.internal.api.ApkVariantOutputImpl

plugins {
    alias(libs.plugins.self.application)
    alias(libs.plugins.self.compose)
    alias(libs.plugins.self.hilt)
    alias(libs.plugins.self.room)
    alias(libs.plugins.kotlin.parcelize)
    alias(libs.plugins.ksp)
    alias(libs.plugins.protobuf)
}

val baseVersionName = "4.25.32"

android {
    namespace = "com.dergoogler.mmrl"

    defaultConfig {
        applicationId = namespace
        versionName = baseVersionName
        versionCode = commitCount + 31320

        resourceConfigurations += arrayOf(
            "en",
            "ar",
            "de",
            "es",
            "fr",
            "hi",
            "in",
            "it",
            "ja",
            "pl",
            "pt",
            "ro",
            "ru",
            "tr",
            "vi",
            "zh-rCN",
            "zh-rTW"
        )

        ndk {
            abiFilters += listOf("armeabi-v7a", "arm64-v8a", "x86", "x86_64")
        }
    }

    val releaseSigning = if (project.hasReleaseKeyStore) {
        signingConfigs.create("release") {
            storeFile = project.releaseKeyStore
            storePassword = project.releaseKeyStorePassword
            keyAlias = project.releaseKeyAlias
            keyPassword = project.releaseKeyPassword
            enableV2Signing = true
            enableV3Signing = true
        }
    } else {
        signingConfigs.getByName("debug")
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            buildConfigField("Boolean", "IS_DEV_VERSION", "false")
            isDebuggable = false
            isJniDebuggable = false
            isRenderscriptDebuggable = false
            renderscriptOptimLevel = 3
            multiDexEnabled = false
        }

        debug {
            buildConfigField("Boolean", "IS_DEV_VERSION", "true")
            applicationIdSuffix = ".debug"
            isJniDebuggable = true
            isDebuggable = true
            isRenderscriptDebuggable = true
            renderscriptOptimLevel = 0
            isMinifyEnabled = false
            multiDexEnabled = false
        }

        all {
            signingConfig = releaseSigning
        }
    }

    buildFeatures {
        buildConfig = true
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_21
        targetCompatibility = JavaVersion.VERSION_21
    }

    packaging.resources.excludes += setOf(
        "META-INF/**",
        "okhttp3/**",
        //"kotlin/**",
        "lib/**",
        "org/**",
        "**.properties",
        "**.bin",
        "**/*.proto"
    )

    dependenciesInfo.includeInApk = false

    applicationVariants.configureEach {
        outputs.configureEach {
            (this as? ApkVariantOutputImpl)?.outputFileName =
                "MMRL-${versionName}-${versionCode}-${name}.apk"
        }
    }
}

protobuf {
    protoc {
        artifact = libs.protobuf.protoc.get().toString()
    }

    generateProtoTasks {
        all().forEach { task ->
            task.builtins {
                register("java") {
                    option("lite")
                }
            }
        }
    }
}

dependencies {
    compileOnly(projects.hiddenApi)
    implementation(projects.compat)

    implementation(libs.androidx.activity.compose)
    implementation(libs.androidx.appcompat)
    implementation(libs.androidx.compose.ui.util)
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.core.splashscreen)
    implementation(libs.androidx.datastore.core)
    implementation(libs.androidx.documentfile)
    implementation(libs.androidx.hilt.navigation.compose)
    implementation(libs.androidx.lifecycle.livedata.ktx)
    implementation(libs.androidx.lifecycle.runtime.compose)
    implementation(libs.androidx.lifecycle.service)
    implementation(libs.androidx.lifecycle.viewModel.compose)
    implementation(libs.androidx.navigation.compose)
    implementation(libs.kotlinx.coroutines.android)
    implementation(libs.kotlinx.serialization.json)
//    implementation(libs.kotlinx.serialization.protobuf)
    implementation(libs.kotlinx.datetime)
    implementation(libs.kotlin.reflect)
    implementation(libs.protobuf.kotlin.lite)
    implementation(libs.markwon.core)
    implementation(libs.timber)

    implementation(libs.semver)
    implementation(libs.coil.compose)


    implementation(libs.square.retrofit)
    implementation(libs.square.retrofit.moshi)
    implementation(libs.square.retrofit.kotlinxSerialization)
    implementation(libs.square.okhttp)
    implementation(libs.square.okhttp.dnsoverhttps)
    implementation(libs.square.logging.interceptor)
    implementation(libs.square.moshi)
    ksp(libs.square.moshi.kotlin)
}