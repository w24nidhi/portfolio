import { Pressable, View } from "react-native";

import { site, socialLinks } from "@/config/site";
import { NAV_ITEMS } from "@/constants/navigation";
import { useScroll } from "@/context/ScrollContext";
import { openUrl } from "@/utils/links";

import { Button, IconButton } from "./ui/Button";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";
import { AppText } from "./ui/Typography";

export function Footer() {
  const { scrollToSection } = useScroll();
  const year = 2026;

  return (
    <View role="contentinfo" className="w-full border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <Container className="py-14">
        <View className="flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <View className="max-w-sm">
            <Logo onPress={() => scrollToSection("home")} />
            <AppText className="mt-3 text-base font-semibold text-ink dark:text-white">{site.role}</AppText>
            <AppText className="mt-2 text-sm leading-6 text-ink-soft dark:text-slate-400">
              Building modern, scalable and high-performance mobile apps with React Native and Expo.
            </AppText>
            <View className="mt-5 flex-row gap-2">
              {socialLinks.map((l) => (
                <IconButton key={l.label} icon={l.icon} label={l.label} href={l.url} />
              ))}
            </View>
          </View>

          <View className="flex-row flex-wrap gap-x-12 gap-y-8">
            <View>
              <AppText className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink-faint">Navigate</AppText>
              <View className="gap-3">
                {NAV_ITEMS.map((item) => (
                  <Pressable key={item.id} role="link" onPress={() => scrollToSection(item.id)} className="web:cursor-pointer">
                    <AppText className="text-sm font-medium text-ink-soft hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
                      {item.label}
                    </AppText>
                  </Pressable>
                ))}
              </View>
            </View>
            <View>
              <AppText className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink-faint">Connect</AppText>
              <View className="flex-row flex-wrap items-center">
                {socialLinks.map((l, i) => (
                  <View key={l.label} className="flex-row items-center">
                    <Pressable role="link" accessibilityLabel={l.label} onPress={() => void openUrl(l.url)} className="web:cursor-pointer">
                      <AppText className="text-sm font-medium text-ink-soft hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
                        {l.label}
                      </AppText>
                    </Pressable>
                    {i < socialLinks.length - 1 ? <AppText className="mx-2.5 text-sm text-slate-300 dark:text-slate-700">|</AppText> : null}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View className="mt-12 flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <AppText className="text-sm text-ink-soft dark:text-slate-400">
            © {year} {site.name}. All rights reserved.
          </AppText>
          <View className="flex-row items-center gap-3">
            <AppText className="text-sm text-ink-faint">Built with React Native + Expo</AppText>
            <Button label="Back to top" variant="secondary" size="sm" icon="arrow-up" onPress={() => scrollToSection("home")} />
          </View>
        </View>
      </Container>
    </View>
  );
}
