import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  Users, 
  Star,
  Heart,
  Share2,
  BookOpen,
  ChefHat
} from 'lucide-react-native';

const myRecipes = [
  {
    id: 1,
    title: 'Classic Spaghetti Carbonara',
    description: 'Authentic Italian carbonara with eggs, cheese, and pancetta',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800',
    prepTime: '10 min',
    cookTime: '15 min',
    servings: 4,
    rating: 4.9,
    isFavorite: true,
    difficulty: 'Medium',
    category: 'Italian',
    dateAdded: '2 days ago',
  },
  {
    id: 2,
    title: 'Thai Green Curry',
    description: 'Spicy and aromatic Thai green curry with vegetables',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
    prepTime: '15 min',
    cookTime: '20 min',
    servings: 6,
    rating: 4.7,
    isFavorite: false,
    difficulty: 'Medium',
    category: 'Thai',
    dateAdded: '1 week ago',
  },
  {
    id: 3,
    title: 'Chocolate Chip Cookies',
    description: 'Soft and chewy chocolate chip cookies',
    image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800',
    prepTime: '15 min',
    cookTime: '12 min',
    servings: 24,
    rating: 4.8,
    isFavorite: true,
    difficulty: 'Easy',
    category: 'Dessert',
    dateAdded: '3 days ago',
  },
  {
    id: 4,
    title: 'Grilled Caesar Salad',
    description: 'Fresh romaine lettuce with homemade Caesar dressing',
    image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=800',
    prepTime: '10 min',
    cookTime: '5 min',
    servings: 2,
    rating: 4.6,
    isFavorite: false,
    difficulty: 'Easy',
    category: 'Salad',
    dateAdded: '5 days ago',
  },
];

const categories = ['All', 'Italian', 'Thai', 'Dessert', 'Salad', 'Breakfast', 'Dinner'];

export default function RecipesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredRecipes = myRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
    const matchesFavorites = !showFavoritesOnly || recipe.isFavorite;
    
    return matchesSearch && matchesCategory && matchesFavorites;
  });

  const renderRecipeCard = (recipe: any) => (
    <TouchableOpacity key={recipe.id} style={styles.recipeCard}>
      <View style={styles.recipeImageContainer}>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        <TouchableOpacity 
          style={[styles.favoriteButton, recipe.isFavorite && styles.favoriteButtonActive]}
        >
          <Heart 
            size={20} 
            color={recipe.isFavorite ? '#FFFFFF' : '#8E8E93'} 
            fill={recipe.isFavorite ? '#FFFFFF' : 'none'}
          />
        </TouchableOpacity>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{recipe.category}</Text>
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
          <View style={styles.statItem}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.statText}>{recipe.rating}</Text>
          </View>
        </View>
        <View style={styles.recipeFooter}>
          <Text style={styles.dateText}>Added {recipe.dateAdded}</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Share2 size={16} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Recipes</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#8E8E93" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search your recipes..."
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#FF6B35" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryButtonText,
              selectedCategory === category && styles.categoryButtonTextActive
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.toolbar}>
        <TouchableOpacity 
          style={styles.toolbarButton}
          onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}
        >
          <Heart 
            size={18} 
            color={showFavoritesOnly ? '#FF6B35' : '#8E8E93'} 
            fill={showFavoritesOnly ? '#FF6B35' : 'none'}
          />
          <Text style={[
            styles.toolbarText,
            showFavoritesOnly && styles.toolbarTextActive
          ]}>
            Favorites Only
          </Text>
        </TouchableOpacity>
        <Text style={styles.resultsText}>
          {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <ScrollView style={styles.recipesContainer} showsVerticalScrollIndicator={false}>
        {filteredRecipes.length === 0 ? (
          <View style={styles.emptyState}>
            <ChefHat size={48} color="#C7C7CC" />
            <Text style={styles.emptyStateTitle}>No recipes found</Text>
            <Text style={styles.emptyStateDescription}>
              {searchQuery ? 'Try adjusting your search' : 'Add your first recipe to get started'}
            </Text>
          </View>
        ) : (
          filteredRecipes.map(renderRecipeCard)
        )}
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
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
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
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  categoriesScroll: {
    paddingLeft: 20,
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  categoryButtonActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  categoryButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#8E8E93',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  toolbarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toolbarText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#8E8E93',
  },
  toolbarTextActive: {
    color: '#FF6B35',
  },
  resultsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
  recipesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  recipeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
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
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButtonActive: {
    backgroundColor: '#FF6B35',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
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
    gap: 16,
    marginBottom: 12,
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
  recipeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#C7C7CC',
  },
  shareButton: {
    padding: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1D1D1F',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});