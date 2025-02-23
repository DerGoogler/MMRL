cmake_minimum_required(VERSION 3.22.1)

project(MMRL)

set(CMAKE_C_FLAGS_RELEASE "-O3 -Wall -Werror")
set(CMAKE_CXX_FLAGS_RELEASE ${CMAKE_C_FLAGS_RELEASE})
set(CMAKE_C_FLAGS_RELWITHDEBINFO ${CMAKE_C_FLAGS_RELEASE})
set(CMAKE_CXX_FLAGS_RELWITHDEBINFO ${CMAKE_C_FLAGS_RELWITHDEBINFO})

find_library(log-lib log)

add_library(file-manager SHARED file-manager.cpp logging.h)
target_link_libraries(file-manager ${log-lib})