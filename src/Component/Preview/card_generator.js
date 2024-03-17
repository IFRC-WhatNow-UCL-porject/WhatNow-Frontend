export default function card_info_generator(type, data) {
    let card_info = {};
    if (type == "alert") {
        card_info.event_name = data.info.event;
        card_info.content = data.info.description;
    } else if (type == "whatnow") {
        card_info.event_name = data.eventType;
        card_info.subtitle = data.translations.en.title;
        card_info.description = data.translations.en.description;
        card_info.content = data.translations.en.stages;
        card_info.society = data.attribution.name;
        card_info.url = data.attribution.url;
    }

    return card_info;
}