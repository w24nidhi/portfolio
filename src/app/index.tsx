import Head from "expo-router/head";
import { View } from "react-native";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";

import { About } from "@/components/About";
import { Apps } from "@/components/Apps";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Footer } from "@/components/Footer";
import { Github } from "@/components/Github";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { site } from "@/config/site";
import { ScrollProvider, useScroll } from "@/context/ScrollContext";

function Page() {
  const { scrollRef, scrollY, viewportHeight } = useScroll();

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  return (
    <View className="flex-1 bg-canvas dark:bg-canvas-dark">
      <Animated.ScrollView
        ref={scrollRef}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onLayout={(e) => {
          viewportHeight.value = e.nativeEvent.layout.height;
        }}
        showsVerticalScrollIndicator
        contentContainerClassName="w-full"
      >
        <View role="main">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <FeaturedProjects />
          <Projects />
          <Github />
          <Apps />
          <Contact />
        </View>
        <Footer />
      </Animated.ScrollView>
      <Navbar />
    </View>
  );
}

export default function Index() {
  return (
    <>
      <Head>
        <title>{`${site.name} | ${site.role}`}</title>
        <meta name="description" content={site.description} />
      </Head>
      <ScrollProvider>
        <Page />
      </ScrollProvider>
    </>
  );
}
