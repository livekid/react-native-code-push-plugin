import { ConfigPlugin, withInfoPlist } from "expo/config-plugins";

import { PluginConfigType } from "../pluginConfig";

/**
 * Sets the CodePushServerURL and CodePushDeploymentKey in the iOS Info.plist
 * https://github.com/microsoft/react-native-code-push/blob/master/docs/setup-ios.md
 */
export const withIosInfoPlistDependency: ConfigPlugin<PluginConfigType> = (
  config,
  props
) => {
  if (!props?.CodePushServerURL) {
    throw new Error(
        "You need to provide the `CodePushServerURL` property for the @config-plugins/react-native-code-push plugin to work."
    );
  }

  if (!props?.CodePushDeploymentKey) {
    throw new Error(
        "You need to provide the `CodePushDeploymentKey` property for the @config-plugins/react-native-code-push plugin to work."
    );
  }

  return withInfoPlist(config, (infoPlistProps) => {
    infoPlistProps.modResults.CodePushServerURL =
          props.CodePushServerURL;

    infoPlistProps.modResults.CodePushDeploymentKey =
      props.CodePushDeploymentKey;

    return infoPlistProps;
  });
};
