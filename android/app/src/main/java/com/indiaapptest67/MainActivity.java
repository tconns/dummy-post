package com.indiaapptest67;

import com.facebook.react.ReactActivity;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;

import com.facebook.FacebookSdk;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    FacebookSdk.sdkInitialize(getApplicationContext());
    PackageInfo info;
    try {
      info = getPackageManager().getPackageInfo("com.indiaapptest67", PackageManager.GET_SIGNATURES);
      for (Signature signature : info.signatures) {
        MessageDigest md;
        md = MessageDigest.getInstance("SHA");
        md.update(signature.toByteArray());
        String something = new String(Base64.encode(md.digest(), 0));
        //String something = new String(Base64.encodeBytes(md.digest()));
        Log.e("hash key", something);
      }
    } catch (PackageManager.NameNotFoundException e1) {
      Log.e("name not found", e1.toString());
    } catch (NoSuchAlgorithmException e) {
      Log.e("no such an algorithm", e.toString());
    } catch (Exception e) {
      Log.e("exception", e.toString());
    }
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "IndiaAppTest67";
  }
}
