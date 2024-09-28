package android.os;

import androidx.annotation.RequiresApi;

import dev.rikka.tools.refine.RefineAs;

@RefineAs(PowerManager.class)
public class PowerManagerHidden {
    @RequiresApi(30)
    public static boolean isRebootingUserspaceSupportedImpl() {
        throw new RuntimeException("Stub!");
    }
}
