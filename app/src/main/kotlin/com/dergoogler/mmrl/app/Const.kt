package com.dergoogler.mmrl.app

import android.os.Environment
import java.io.File

object Const {
    val PUBLIC_DOWNLOADS: File = Environment.getExternalStoragePublicDirectory(
        Environment.DIRECTORY_DOWNLOADS
    )

    const val PRIVACY_POLICY_URL = "https://dergoogler.com/legal/privacy"
    const val GOOGLE_PLAY_DOWNLOAD = "https://play.google.com/store/apps/details?id=com.dergoogler.mmrl"
    const val GITHUB_DOWNLOAD = "https://github.com/DerGoogler/MMRL/releases"
    const val SANMER_GITHUB_URL = "https://github.com/SanmerDev"
    const val GOOGLER_GITHUB_URL = "https://github.com/DerGoogler"
    const val RESOURCES_URL = "https://github.com/DerGoogler/MMRL/wiki"
    const val TRANSLATE_URL = "https://example.com/translate"
    const val GITHUB_URL = "https://github.com/DerGoogler/MMRL"
    const val TELEGRAM_URL = "https://t.me/GooglersRepo"
    const val DEMO_REPO_URL = "https://gr.dergoogler.com/gmr/"
    const val SPDX_URL = "https://spdx.org/licenses/%s.json"
}