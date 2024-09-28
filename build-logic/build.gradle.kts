plugins {
    `kotlin-dsl`
}

dependencies {
    compileOnly(libs.android.gradle)
    compileOnly(libs.compose.gradle)
    compileOnly(libs.kotlin.gradle)
    compileOnly(libs.ksp.gradle)
}

gradlePlugin {
    plugins {
        register("self.application") {
            id = "self.application"
            implementationClass = "ApplicationConventionPlugin"
        }
        
        register("self.library") {
            id = "self.library"
            implementationClass = "LibraryConventionPlugin"
        }

        register("self.compose") {
            id = "self.compose"
            implementationClass = "ComposeConventionPlugin"
        }

        register("self.hilt") {
            id = "self.hilt"
            implementationClass = "HiltConventionPlugin"
        }

        register("self.room") {
            id = "self.room"
            implementationClass = "RoomConventionPlugin"
        }
    }
}