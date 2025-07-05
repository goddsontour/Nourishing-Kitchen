import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Search, 
  Plus, 
  Clock, 
  Users, 
  Star,
  Globe,
  ChefHat,
  Utensils
} from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');

const featuredRecipes = [
  {
    id: 1,
    title: 'Mediterranean Quinoa Bowl',
    description: 'Fresh and healthy Mediterranean-inspired quinoa bowl with roasted vegetables',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    prepTime: '15 min',
    cookTime: '25 min',
    servings: 4,
    rating: 4.8,
    allergens: ['gluten-free', 'vegetarian'],
    difficulty: 'Easy',
  },
  {
    id: 2,
    title: 'Creamy Mushroom Risotto',
    description: 'Rich and creamy arborio rice risotto with mixed mushrooms and herbs',
    image: 'https://images.pexels.com/photos/725992/pexels-photo-725992.jpeg?auto=compress&cs=tinysrgb&w=800',
    prepTime: '10 min',
    cookTime: '30 min',
    servings: 6,
    rating: 4.9,
    allergens: ['vegetarian', 'gluten-free'],
    difficulty: 'Medium',
  },
  {
    id: 3,
    title: 'Grilled Salmon with Lemon',
    description: 'Perfectly grilled salmon fillet with fresh lemon and herbs',
    image: 'https://images.pexels.com/photos/3682837/pexels-photo-3682837.jpeg?auto=compress&cs=tinysrgb&w=800',
    prepTime: '5 min',
    cookTime: '12 min',
    servings: 2,
    rating: 4.7,
    allergens: ['pescatarian', 'gluten-free'],
    difficulty: 'Easy',
  },
];

const quickActions = [
  { id: 1, title: 'Add Recipe', icon: Plus, color: '#FF6B35' },
  { id: 2, title: 'Scrape Recipe', icon: Globe, color: '#4CAF50' },
  { id: 3, title: 'Meal Plan', icon: ChefHat, color: '#2196F3' },
  { id: 4, title: 'Cook Now', icon: Utensils, color: '#9C27B0' },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const renderRecipeCard = (recipe: any) => (
    <TouchableOpacity key={recipe.id} style={styles.recipeCard}>
      <View style={styles.recipeImageContainer}>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        <View style={styles.ratingBadge}>
          <Star size={12} color="#FFD700" fill="#FFD700" />
          <Text style={styles.ratingText}>{recipe.rating}</Text>
        </View>
      </View>
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{recipe.title}</Text>
        <Text style={styles.recipeDescription}>{recipe.description}</Text>
        <View style={styles.recipeStats}>
          <View style={styles.statItem}>
            <Clock size={14} color="#8E8E93" />
            <Text style={styles.statText}>{recipe.prepTime}</Text>
          </View>
          <View style={styles.statItem}>
            <Users size={14} color="#8E8E93" />
            <Text style={styles.statText}>{recipe.servings}</Text>
          </View>
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderQuickAction = (action: any) => (
    <TouchableOpacity key={action.id} style={styles.quickActionItem}>
      <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
        <action.icon size={24} color="#FFFFFF" />
      </View>
      <Text style={styles.quickActionText}>{action.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning! 👋</Text>
          <Text style={styles.subtitle}>What would you like to cook today?</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#8E8E93" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search recipes, ingredients..."
              placeholderTextColor="#8E8E93"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            {quickActions.map(renderQuickAction)}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Recipes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.recipesScroll}
          >
            {featuredRecipes.map(renderRecipeCard)}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityIcon}>
              <Plus size={20} color="#FF6B35" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Recipe Added</Text>
              <Text style={styles.activityDescription}>
                You added "Thai Green Curry" to your collection
              </Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Playfair-Bold',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1D1D1F',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1D1D1F',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FF6B35',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  quickActionItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#1D1D1F',
    textAlign: 'center',
  },
  recipesScroll: {
    paddingLeft: 20,
  },
  recipeCard: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  recipeImageContainer: {
    position: 'relative',
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#1D1D1F',
  },
  recipeInfo: {
    padding: 16,
  },
  recipeTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  recipeDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginBottom: 12,
    lineHeight: 20,
  },
  recipeStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#8E8E93',
  },
  difficultyBadge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 'auto',
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4CAF50',
  },
  activityCard: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF4F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1D1D1F',
    marginBottom: 2,
  },
  activityDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#C7C7CC',
  },
});