import { ResourceXML } from "@expo/config-plugins/build/android/Resources";
import {
  AndroidConfig,
  ConfigPlugin,
  withStringsXml,
} from "expo/config-plugins";

import { PluginConfigType } from "../pluginConfig";

/** Helper to add string.xml JSON items or overwrite existing items with the same name. */
function setStrings(strings: ResourceXML, name: string, value: string) {
  const xmlProperties = { name, moduleConfig: true };

  return AndroidConfig.Strings.setStringItem(
    [
      // XML represented as JSON
      // <string moduleConfig="true" name="">value</string>
      { $: xmlProperties, _: value },
    ],
    strings
  );
}

/**
 * Update `<project>/app/src/main/res/values/strings.xml` by adding react-native-code-push deployment key
 */
export const withAndroidStringsDependency: ConfigPlugin<PluginConfigType> = (
  config,
  props
) => {
  if (!props?.CodePushServerURL) {
    throw new Error(
        "You need to provide the `CodePushServerURL` Android property for the @config-plugins/react-native-code-push plugin to work."
    );
  }

  if (!props?.CodePushDeploymentKey) {
    throw new Error(
      "You need to provide the `CodePushDeploymentKey` Android property for the @config-plugins/react-native-code-push plugin to work."
    );
  }

  return withStringsXml(config, (xmlProps) => {
    if (props?.CodePushServerURL) {
      xmlProps.modResults = setStrings(
          xmlProps.modResults,
          "CodePushServerUrl",
          props?.CodePushServerURL
      );
    }

    xmlProps.modResults = setStrings(
      xmlProps.modResults,
      "CodePushDeploymentKey",
      props.CodePushDeploymentKey
    );

    return xmlProps;
  });
};
