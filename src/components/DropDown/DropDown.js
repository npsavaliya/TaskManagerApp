import React from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { colors } from "../../theme/colors";
import { fontScale, scale } from "../../utils/sizes";

export const DropdownComponent = ({
  selectTextStyle,
  style,
  data,
  value,
  onChange,
  placeholderText,
  labelField = "label",
  valueField = "value",
  disabled = false,
}) => {
  const selectedTextStyle = [styles.selectedTextStyle, selectTextStyle];
  const dropdownStyle = [styles.dropdown, style];

  return (
    <Dropdown
      style={dropdownStyle}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={selectedTextStyle}
      disable={disabled}
      data={data}
      search={false}
      maxHeight={300}
      labelField={labelField}
      valueField={valueField}
      placeholder={placeholderText}
      value={value}
      onChange={onChange}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    margin: scale(16),
    height: scale(50),
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    width: "80%",
  },
  placeholderStyle: {
    fontSize: fontScale(16),
  },
  selectedTextStyle: {
    fontSize: fontScale(16),
    color: colors.text,
  },
});
