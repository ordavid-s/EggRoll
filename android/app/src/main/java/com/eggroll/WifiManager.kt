package com.eggroll; // replace your-apps-package-name with your app’s package name

import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.net.wifi.SoftApConfiguration
import android.net.wifi.WifiManager
import com.facebook.react.bridge.Promise
import android.content.Context
import java.util.concurrent.Executor

import java.util.Map;
import java.util.HashMap;
import android.util.Log;

class WifiManagerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val wifiManager: WifiManager = reactContext.applicationContext.getSystemService(Context.WIFI_SERVICE) as WifiManager
    
    override fun getName() = "WifiManagerModule"

    @ReactMethod
    fun createCalendarEvent(name: String, location: String) {
        Log.d("CalendarModule", "Create event called with name: $name and location: $location")
    }

    fun startLocalOnlyHotspotWithConfig(config: SoftApConfiguration, executor: Executor?) {
        try{
            WifiManager::class.java.getMethod(
                "startLocalOnlyHotspot", SoftApConfiguration::class.java, Executor::class.java,
                WifiManager.LocalOnlyHotspotCallback::class.java,
            ).invoke(wifiManager, config, executor, object : WifiManager.LocalOnlyHotspotCallback() {
                override fun onStarted(reservation: WifiManager.LocalOnlyHotspotReservation) {
                    Log.d("CalendarModule", "ap started")
                }

                override fun onStopped() {
                    Log.d("CalendarModule", "hotspot stopped")
                }

                override fun onFailed(reason: Int) {
                    Log.e("CalendarModule", "Failed to start hotspot: Reason $reason")
                }
            })
        } catch (e: NoSuchMethodException) {
            Log.e("WifiManagerModule", "No such method: ${e.message}")
        } catch (e: IllegalAccessException) {
            Log.e("WifiManagerModule", "Illegal access: ${e.message}")
        }  
    }

    @ReactMethod
    fun startLocalOnlyHotspotWithConfig(
    ) {        
        // Get SoftApConfiguration.Builder class using reflection
        // Get the Builder class using reflection
        val builderClass = Class.forName("android.net.wifi.SoftApConfiguration\$Builder")
        // Get the newInstance method of Builder
        val builderConstructor = builderClass.getDeclaredConstructor()
        // Make the constructor accessible
        builderConstructor.isAccessible = true
        // Create an instance of Builder using newInstance
        val builderInstance = builderConstructor.newInstance()

        val setSsidMethod = builderClass.getDeclaredMethod("setSsid", String::class.java)
        val setPassphraseMethod = builderClass.getDeclaredMethod("setPassphrase", String::class.java, Int::class.java)
        setSsidMethod.invoke(builderInstance, "Your_SSID")
        setPassphraseMethod.invoke(builderInstance, "Your_Passphrase", SoftApConfiguration.SECURITY_TYPE_WPA2_PSK)

        // Get the build method from Builder
        val buildMethod = builderClass.getDeclaredMethod("build")
        
        // Invoke the build method on the Builder instance
        val softApConfig = buildMethod.invoke(builderInstance) as SoftApConfiguration

        Log.d("CalendarModule", "managed to make soft AP")
        // WifiManager::class.java.getMethod("setSoftApConfiguration", SoftApConfiguration::class.java).invoke(wifiManager, softApConfig)
        // Log.d("CalendarModule", "managed to set settings")
        startLocalOnlyHotspotWithConfig(softApConfig, null)
    }

}