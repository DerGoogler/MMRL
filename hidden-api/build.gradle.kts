plugins {
    alias(libs.plugins.self.library)
}

android {
    namespace = "com.dergoogler.mmrl.hidden_api"
}

dependencies {
    annotationProcessor(libs.rikka.refine.compiler)
    compileOnly(libs.rikka.refine.annotation)
    compileOnly(libs.androidx.annotation)
}