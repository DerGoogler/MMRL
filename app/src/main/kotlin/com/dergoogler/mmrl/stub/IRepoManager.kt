package com.dergoogler.mmrl.stub

import com.dergoogler.mmrl.model.online.ModulesJson
import com.dergoogler.mmrl.model.online.Sponsor
import com.dergoogler.mmrl.network.NetworkUtils
import retrofit2.Call
import retrofit2.create
import retrofit2.http.GET

interface IRepoManager {

    @get:GET("json/modules.json")
    val modules: Call<ModulesJson>

    @get:GET("json/sponsors.json")
    val sponsors: Call<List<Sponsor>>

    companion object {
        fun build(repoUrl: String): IRepoManager {
            return NetworkUtils.createRetrofit()
                .baseUrl(repoUrl)
                .build()
                .create()
        }

        val gmr get(): IRepoManager = this.build("https://gr.dergoogler.com/gmr/")
    }
}