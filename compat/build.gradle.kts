plugins {
    alias(libs.plugins.self.library)
    alias(libs.plugins.kotlin.parcelize)
    alias(libs.plugins.rikka.refine)
}

android {
    namespace = "dev.dergoogler.mmrl.compat"

    buildFeatures {
        aidl = true
    }
}

dependencies {
    implementation(libs.androidx.runtime.android)
    compileOnly(projects.hiddenApi)
    implementation(libs.hiddenApiBypass)
    implementation(libs.rikka.refine.runtime)

    implementation(libs.libsu.core)
    implementation(libs.libsu.service)
    implementation(libs.libsu.io)

    implementation(libs.rikka.shizuku.api)
    implementation(libs.rikka.shizuku.provider)

    implementation(libs.androidx.annotation)
    implementation(libs.kotlinx.coroutines.android)
}