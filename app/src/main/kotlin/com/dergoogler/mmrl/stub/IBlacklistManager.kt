package com.dergoogler.mmrl.stub

import com.dergoogler.mmrl.model.online.Blacklist
import com.dergoogler.mmrl.network.NetworkUtils
import retrofit2.Call
import retrofit2.create
import retrofit2.http.GET

interface IBlacklistManager {

    @get:GET("json/blacklist.json")
    val blacklist: Call<List<Blacklist>>

    companion object {
        fun build(): IBlacklistManager {
            return NetworkUtils.createRetrofit()
                .baseUrl("https://raw.githubusercontent.com/Googlers-Repo/gmr/refs/heads/master/")
                .build()
                .create()
        }
    }
}