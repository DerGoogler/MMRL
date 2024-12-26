package dev.dergoogler.mmrl.compat.stub;

interface IShell {
    boolean isAlive();
    void exec();
    void close();
}