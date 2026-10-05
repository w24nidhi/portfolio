import { useState } from "react";
import { Pressable, View } from "react-native";
import Animated, { FadeIn, interpolate, useAnimatedStyle } from "react-native-reanimated";

import { site } from "@/config/site";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useHover } from "@/hooks/useHover";
import { sendContactMessage } from "@/services/contact";
import type { IconName } from "@/types";
import { openUrl } from "@/utils/links";
import { hasErrors, validateContactForm, type ContactFormErrors, type ContactFormValues } from "@/utils/validation";

import { Button } from "./ui/Button";
import { FormField } from "./ui/FormField";
import { Icon } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";
import { Section, SectionHeading } from "./ui/Section";
import { AppText, Heading } from "./ui/Typography";

const EMPTY: ContactFormValues = { name: "", email: "", message: "" };

function ContactMethod({ icon, label, value, url }: { icon: IconName; label: string; value: string; url: string }) {
  const { colors } = useAppTheme();
  const { progress, handlers } = useHover();
  const style = useAnimatedStyle(() => ({ transform: [{ translateX: interpolate(progress.value, [0, 1], [0, 4]) }] }));

  return (
    <Pressable
      role="link"
      accessibilityLabel={`${label}: ${value}`}
      onPress={() => void openUrl(url)}
      {...handlers}
      className="flex-row items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-surface-dark web:cursor-pointer web:outline-none"
    >
      <View className="h-12 w-12 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/30">
        <Icon name={icon} size={22} color={colors.accent} />
      </View>
      <View className="flex-1">
        <AppText className="text-xs font-semibold uppercase tracking-wider text-ink-faint">{label}</AppText>
        <AppText className="mt-0.5 text-base font-semibold text-ink dark:text-white" numberOfLines={1}>
          {value}
        </AppText>
      </View>
      <Animated.View style={style}>
        <Icon name="arrow-right" size={20} color={colors.textMuted} />
      </Animated.View>
    </Pressable>
  );
}

export function Contact() {
  const [values, setValues] = useState<ContactFormValues>(EMPTY);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const update = (key: keyof ContactFormValues) => (text: string) => {
    const next = { ...values, [key]: text };
    setValues(next);
    // Re-validate live once the user has attempted to submit.
    if (touched) setErrors(validateContactForm(next));
    if (status !== "idle" && status !== "sending") setStatus("idle");
  };

  const submit = async () => {
    setTouched(true);
    const found = validateContactForm(values);
    setErrors(found);
    if (hasErrors(found)) return;

    setStatus("sending");
    const result = await sendContactMessage(values);
    if (result.ok) {
      setStatus("sent");
      setStatusMessage(
        result.via === "endpoint"
          ? "Thanks! Your message has been sent — I'll reply within 24 hours."
          : "Your email app should open with the message ready to send.",
      );
      setValues(EMPTY);
      setTouched(false);
    } else {
      setStatus("error");
      setStatusMessage(result.error);
    }
  };

  const linkedinHandle = site.linkedinUrl.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "").replace(/\/$/, "");

  return (
    <Section id="contact" label="Contact">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something great together."
        subtitle="Have a project in mind, a role to fill or just want to say hi? My inbox is always open."
      />

      <View className="flex-col gap-10 lg:flex-row lg:gap-14">
        <View className="w-full gap-4 lg:w-5/12">
          <Reveal from="left">
            <ContactMethod icon="email-outline" label="Email" value={site.email} url={`mailto:${site.email}`} />
          </Reveal>
          <Reveal from="left" delay={80}>
            <ContactMethod icon="linkedin" label="LinkedIn" value={linkedinHandle} url={site.linkedinUrl} />
          </Reveal>
          <Reveal from="left" delay={160}>
            <ContactMethod icon="github" label="GitHub" value={`@${site.githubUsername}`} url={site.githubUrl} />
          </Reveal>
          <Reveal from="left" delay={240}>
            <View className="mt-2 flex-row items-center gap-3 rounded-2xl border border-dashed border-slate-300 p-4 dark:border-slate-700">
              <Icon name="clock-outline" size={20} color="#10B981" />
              <AppText className="flex-1 text-sm leading-6 text-ink-soft dark:text-slate-400">
                Usually replies within 24 hours · {site.location}
              </AppText>
            </View>
          </Reveal>
        </View>

        <View className="w-full lg:flex-1">
          <Reveal from="right">
            <View
              className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-surface-dark"
              style={{ boxShadow: "0px 20px 50px rgba(15,23,42,0.06)" }}
              role="form"
              aria-label="Contact form"
            >
              <Heading level={3} className="mb-6 text-xl font-bold text-ink dark:text-white">
                Send a message
              </Heading>
              <View className="gap-5">
                <View className="flex-col gap-5 sm:flex-row">
                  <View className="flex-1">
                    <FormField
                      nativeID="contact-name"
                      label="Name"
                      placeholder="Your name"
                      value={values.name}
                      onChangeText={update("name")}
                      error={errors.name}
                      autoComplete="name"
                      textContentType="name"
                      returnKeyType="next"
                    />
                  </View>
                  <View className="flex-1">
                    <FormField
                      nativeID="contact-email"
                      label="Email"
                      placeholder="you@company.com"
                      value={values.email}
                      onChangeText={update("email")}
                      error={errors.email}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                      textContentType="emailAddress"
                      returnKeyType="next"
                    />
                  </View>
                </View>
                <FormField
                  nativeID="contact-message"
                  label="Message"
                  placeholder="Tell me about your project, timeline and goals…"
                  value={values.message}
                  onChangeText={update("message")}
                  error={errors.message}
                  multiline
                  numberOfLines={6}
                  maxLength={2000}
                />

                {status === "sent" || status === "error" ? (
                  <Animated.View
                    entering={FadeIn.duration(250)}
                    role="status"
                    className={`flex-row items-start gap-3 rounded-2xl p-4 ${
                      status === "sent" ? "bg-emerald-50 dark:bg-emerald-950/40" : "bg-rose-50 dark:bg-rose-950/40"
                    }`}
                  >
                    <Icon
                      name={status === "sent" ? "check-circle-outline" : "alert-circle-outline"}
                      size={20}
                      color={status === "sent" ? "#10B981" : "#F43F5E"}
                    />
                    <AppText
                      className={`flex-1 text-sm leading-6 ${
                        status === "sent" ? "text-emerald-800 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"
                      }`}
                    >
                      {statusMessage}
                    </AppText>
                  </Animated.View>
                ) : null}

                <Button
                  label={status === "sending" ? "Sending…" : "Send Message"}
                  icon="send"
                  iconPosition="right"
                  size="lg"
                  fullWidth
                  disabled={status === "sending"}
                  onPress={() => void submit()}
                />
              </View>
            </View>
          </Reveal>
        </View>
      </View>
    </Section>
  );
}
