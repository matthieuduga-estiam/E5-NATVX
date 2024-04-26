import { useState } from "react";
import { Input, Icon } from "@rneui/themed";
import { Controller } from "react-hook-form";
import { Keyboard } from "react-native";

export const AppInput = ({
  control,
  reference,
  defaultValue,
  name,
  placeholder,
  rules,
  validation,
  isPassword,
  multiline = false,
}) => {

  const [text, setText] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const errors = control._formState.errors;

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      validate={validation}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          ref={reference}
          placeholder={placeholder}
          onChangeText={(value) => {
            onChange(value);
            setText(text);
          }}
          onTouchMove={() => Keyboard.dismiss()}
          onBlur={onBlur}
          value={value}
          errorMessage={errors[name] ? errors[name].message : ""}
          secureTextEntry={isPassword ? !showPassword : false}
          multiline={multiline}
          rightIcon={
            isPassword ? (
              <Icon
                type="font-awesome-5"
                name={showPassword ? "eye-slash" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
                size={16}
              />
            ) : null
          }
          style={{ height: multiline ? 100 : 40}}
        />
      )}
    />
  );
};
