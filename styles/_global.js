import { Dimensions, StyleSheet } from "react-native";

const _GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20
  },

  status_container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },

  status_text_on: {
    color: "#56CCF2",
    fontSize: 12,
  },

  status_text_off: {
    color: "#EC352E",
    fontSize: 12,
  },

  h1: {
    fontWeight: "700",
    fontSize: 20,
  },

  p_gray: {
    color: '#3b3b3b'
  },

  menu_container: {
    padding: 20,
    backgroundColor: '#bcf',
    width: "100%",
    borderRadius: 20
  },

  separator: {
    marginVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth
  },

  picker: {
    width: "100%",
  }
})

export default _GlobalStyles;