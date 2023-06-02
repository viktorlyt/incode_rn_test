import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e0e0e0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  text_header: {
    fontSize: 20,
    color: 'black',
  },
  counters: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  counterBox: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  table: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 10,
  },
  tableHeader: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  icon: {
    marginRight: 10,
    marginLeft: 5,
  },
  cellName: {
    flex: 1.6,
    padding: 3,
    paddingLeft: 10,
    color: '#000000',
    borderLeftWidth: 1,
    borderColor: '#e0e0e0',
    fontWeight: '700',
  },
  cell: {
    flex: 1,
    padding: 2,
    paddingLeft: 5,
    color: '#000000',
    borderLeftWidth: 1,
    borderColor: '#e0e0e0',
    fontWeight: '700',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pages: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  paginationArrow: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    color: '#000000',
    fontSize: 24,
  },
  paginationText: {
    padding: 10,
    color: '#000000',
    fontSize: 16,
  },
});
