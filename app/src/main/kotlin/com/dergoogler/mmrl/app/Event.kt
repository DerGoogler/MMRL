package com.dergoogler.mmrl.app

enum class Event {
    NON,
    LOADING,
    SUCCEEDED,
    FAILED;

    companion object {
        val Event.isNon get() = this == NON
        val Event.isLoading get() = this == LOADING
        val Event.isSucceeded get() = this == SUCCEEDED
        val Event.isFailed get() = this == FAILED
        val Event.isFinished get() = isSucceeded || isFailed
        val Event.isNotReady get() = isNon || isFailed
    }
}