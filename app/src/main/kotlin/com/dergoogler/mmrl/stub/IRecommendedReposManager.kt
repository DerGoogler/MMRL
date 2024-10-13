package com.dergoogler.mmrl.stub

import com.dergoogler.mmrl.model.online.RecommendedRepo
import com.dergoogler.mmrl.network.NetworkUtils
import retrofit2.Call
import retrofit2.create
import retrofit2.http.GET


interface IRecommendedReposManager {

    @get:GET("json/recommended_repos.json")
    val recommendedRepos: Call<List<RecommendedRepo>>

    companion object {
        fun build(): IRecommendedReposManager {
            return NetworkUtils.createRetrofit()
                .baseUrl("https://raw.githubusercontent.com/Googlers-Repo/gmr/refs/heads/master/")
                .build()
                .create()
        }
    }
}