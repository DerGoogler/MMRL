package com.dergoogler.mmrl.stub

import com.dergoogler.mmrl.model.online.Blacklist
import com.dergoogler.mmrl.model.online.Changelog
import com.dergoogler.mmrl.network.NetworkUtils
import retrofit2.Call
import retrofit2.create
import retrofit2.http.GET

interface IMMRLApiManager {
    @get:GET("changelog.json")
    val changelog: Call<List<Changelog>>

    @get:GET("blacklist.json")
    val blacklist: Call<List<Blacklist>>

    // @get:GET("repositories.json")
    // val repositories: Call<List<Blacklist>>

    companion object {
        fun build(): IMMRLApiManager {
            return NetworkUtils.createRetrofit()
                .baseUrl("https://mmrl.dergoogler.com/")
                .build()
                .create()
        }
    }
}