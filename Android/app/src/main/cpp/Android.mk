LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)
LOCAL_MODULE    := libshell
LOCAL_SRC_FILES := shell.cpp
include $(BUILD_SHARED_LIBRARY)

include $(CLEAR_VARS)
LOCAL_MODULE    := libproperties
LOCAL_SRC_FILES := properties.cpp
include $(BUILD_SHARED_LIBRARY)

include $(CLEAR_VARS)
LOCAL_MODULE    := libclog
LOCAL_SRC_FILES := clog.cpp
LOCAL_LDLIBS := -llog
include $(BUILD_SHARED_LIBRARY)