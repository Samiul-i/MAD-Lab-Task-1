// app/(tabs)/(home)/index.tsx
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArticleCard from "../../../components/article-card";
import { Article, ARTICLES } from "../../../data/articles";

const CATEGORIES = [...new Set(ARTICLES.map((a) => a.category))];

export default function ArticleList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = selectedCategory
    ? ARTICLES.filter((a) => a.category === selectedCategory)
    : ARTICLES;

  const handlePress = (article: Article) => {
    router.push({
      pathname: "/(tabs)/(home)/[id]",
      params: { id: article.id },
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ArticleCard article={item} onPress={handlePress} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.pillRow}
            >
              {["All", ...CATEGORIES].map((category) => {
                const active =
                  category === "All" ? selectedCategory === null : selectedCategory === category;
                return (
                  <Pressable
                    key={category}
                    style={[styles.pill, active && styles.pillActive]}
                    onPress={() => setSelectedCategory(category === "All" ? null : category)}
                  >
                    <Text style={[styles.pillText, active && styles.pillTextActive]}>
                      {category}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderText}>{filtered.length} stories</Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F0F4F8" },
  list: { paddingTop: 12, paddingBottom: 32 },
  pillRow: { paddingHorizontal: 14, paddingBottom: 12, gap: 8 },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  pillActive: { backgroundColor: "#0D9488", borderColor: "#0D9488" },
  pillText: { fontSize: 13, fontWeight: "600", color: "#475569" },
  pillTextActive: { color: "#FFFFFF" },
  listHeader: { paddingHorizontal: 16, paddingBottom: 8 },
  listHeaderText: { fontSize: 12, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 1 },
});