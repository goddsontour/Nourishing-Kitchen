import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShoppingCart, Plus, Check, X, Share2, Download, Apple, Fish, Milk, Heading as Bread, Package, Snowflake, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';

const shoppingListData = [
  {
    category: 'Produce',
    icon: Apple,
    color: '#4CAF50',
    items: [
      { id: 1, name: 'Roma Tomatoes', quantity: '3 lbs', completed: false },
      { id: 2, name: 'Fresh Basil', quantity: '1 bunch', completed: true },
      { id: 3, name: 'Red Onions', quantity: '2 medium', completed: false },
      { id: 4, name: 'Garlic', quantity: '1 head', completed: false },
    ],
  },
  {
    category: 'Proteins',
    icon: Fish,
    color: '#E91E63',
    items: [
      { id: 5, name: 'Salmon Fillet', quantity: '1 lb', completed: false },
      { id: 6, name: 'Pancetta', quantity: '4 oz', completed: true },
      { id: 7, name: 'Eggs', quantity: '1 dozen', completed: false },
    ],
  },
  {
    category: 'Dairy',
    icon: Milk,
    color: '#2196F3',
    items: [
      { id: 8, name: 'Parmesan Cheese', quantity: '8 oz', completed: false },
      { id: 9, name: 'Heavy Cream', quantity: '1 pint', completed: true },
      { id: 10, name: 'Butter', quantity: '1 stick', completed: false },
    ],
  },
  {
    category: 'Pantry',
    icon: Package,
    color: '#FF9800',
    items: [
      { id: 11, name: 'Olive Oil', quantity: '1 bottle', completed: false },
      { id: 12, name: 'Sea Salt', quantity: '1 container', completed: true },
      { id: 13, name: 'Black Pepper', quantity: '1 grinder', completed: false },
      { id: 14, name: 'Spaghetti', quantity: '1 lb', completed: false },
    ],
  },
  {
    category: 'Frozen',
    icon: Snowflake,
    color: '#00BCD4',
    items: [
      { id: 15, name: 'Green Peas', quantity: '1 bag', completed: false },
    ],
  },
];

export default function ShoppingScreen() {
  const [shoppingList, setShoppingList] = useState(shoppingListData);
  const [showCompleted, setShowCompleted] = useState(true);

  const toggleItem = (categoryIndex: number, itemId: number) => {
    const newList = [...shoppingList];
    const category = newList[categoryIndex];
    const item = category.items.find(item => item.id === itemId);
    if (item) {
      item.completed = !item.completed;
      setShoppingList(newList);
    }
  };

  const getTotalItems = () => {
    return shoppingList.reduce((total, category) => total + category.items.length, 0);
  };

  const getCompletedItems = () => {
    return shoppingList.reduce((total, category) => 
      total + category.items.filter(item => item.completed).length, 0
    );
  };

  const renderCategorySection = (category: any, categoryIndex: number) => {
    const visibleItems = showCompleted 
      ? category.items 
      : category.items.filter((item: any) => !item.completed);

    if (visibleItems.length === 0) return null;

    return (
      <View key={category.category} style={styles.categorySection}>
        <View style={styles.categoryHeader}>
          <View style={styles.categoryInfo}>
            <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
              <category.icon size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.categoryTitle}>{category.category}</Text>
          </View>
          <Text style={styles.categoryCount}>
            {visibleItems.length} item{visibleItems.length !== 1 ? 's' : ''}
          </Text>
        </View>
        <View style={styles.itemsList}>
          {visibleItems.map((item: any) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.itemRow, item.completed && styles.itemRowCompleted]}
              onPress={() => toggleItem(categoryIndex, item.id)}
            >
              <View style={styles.itemContent}>
                <View style={[styles.checkbox, item.completed && styles.checkboxCompleted]}>
                  {item.completed && <Check size={16} color="#FFFFFF" />}
                </View>
                <View style={styles.itemInfo}>
                  <Text style={[styles.itemName, item.completed && styles.itemNameCompleted]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.itemQuantity, item.completed && styles.itemQuantityCompleted]}>
                    {item.quantity}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.itemActions}>
                <X size={16} color="#C7C7CC" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping List</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Share2 size={20} color="#8E8E93" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Download size={20} color="#8E8E93" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <MoreHorizontal size={20} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressTitle}>Shopping Progress</Text>
          <Text style={styles.progressText}>
            {getCompletedItems()} of {getTotalItems()} items completed
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(getCompletedItems() / getTotalItems()) * 100}%` }
            ]} 
          />
        </View>
      </View>

      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Show completed</Text>
          <Switch
            value={showCompleted}
            onValueChange={setShowCompleted}
            thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : showCompleted ? '#FF6B35' : '#C7C7CC'}
            trackColor={{ false: '#E5E5E7', true: '#FF6B35' }}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {shoppingList.map((category, index) => renderCategorySection(category, index))}
        
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <ShoppingCart size={24} color="#FF6B35" />
            <Text style={styles.summaryTitle}>Shopping Summary</Text>
          </View>
          <View style={styles.summaryStats}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Items</Text>
              <Text style={styles.summaryValue}>{getTotalItems()}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Completed</Text>
              <Text style={styles.summaryValue}>{getCompletedItems()}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Remaining</Text>
              <Text style={styles.summaryValue}>{getTotalItems() - getCompletedItems()}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Playfair-Bold',
    color: '#1D1D1F',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
  progressContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
  progressInfo: {
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E5E7',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 4,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggleLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#8E8E93',
  },
  scrollView: {
    flex: 1,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1D1D1F',
  },
  categoryCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
  itemsList: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  itemRowCompleted: {
    backgroundColor: '#F8F8F8',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1D1D1F',
    marginBottom: 2,
  },
  itemNameCompleted: {
    color: '#8E8E93',
    textDecorationLine: 'line-through',
  },
  itemQuantity: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
  itemQuantityCompleted: {
    color: '#C7C7CC',
  },
  itemActions: {
    padding: 8,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1D1D1F',
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1D1D1F',
  },
});